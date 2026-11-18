"""Export north-up route outlines without geographic coordinates or activity IDs.

Usage: python3 scripts/export-running-route-shapes.py RUNS_JSON ROUTES_JSON
"""

import argparse
import json
import math
from collections import defaultdict
from pathlib import Path


def route_shapes(summaries, routes):
    days = defaultdict(list)
    for run in summaries["runs"]:
        days[run["date"]].append(routes.get(run["id"], {"status": "no_gps"}))
    result = {}
    for day, records in days.items():
        segments = [segment for record in records if record["status"] == "available"
                    for segment in record.get("segments", []) if len(segment) >= 2]
        if not segments:
            result[day] = {"status": "unavailable" if any(record["status"] == "parse_error" for record in records) else "no_gps"}
            continue
        origin_longitude = segments[0][0][0]
        projected = []
        for segment in segments:
            points = []
            for longitude, latitude in segment:
                # Mercator preserves the shape and north-up orientation used by the prototype.
                longitude_delta = (longitude - origin_longitude + 180) % 360 - 180
                latitude = math.radians(max(-85.05112878, min(85.05112878, latitude)))
                points.append((math.radians(longitude_delta), -math.log(math.tan(math.pi / 4 + latitude / 2))))
            projected.append(points)
        all_points = [point for segment in projected for point in segment]
        min_x, max_x = min(x for x, _ in all_points), max(x for x, _ in all_points)
        min_y, max_y = min(y for _, y in all_points), max(y for _, y in all_points)
        extent = max(max_x - min_x, max_y - min_y)
        if extent <= 1e-12:
            result[day] = {"status": "unavailable"}
            continue
        center_x, center_y = (min_x + max_x) / 2, (min_y + max_y) / 2
        outlines = [[[round((x - center_x) / extent + .5, 4), round((y - center_y) / extent + .5, 4)]
                     for x, y in segment] for segment in projected]
        result[day] = {"status": "available", "segments": outlines,
                       "recordedRuns": sum(record["status"] == "available" for record in records),
                       "totalRuns": len(records)}
    return {"schemaVersion": 1, "routes": result}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("runs", type=Path)
    parser.add_argument("routes", type=Path)
    parser.add_argument("--output", type=Path,
                        default=Path(__file__).resolve().parents[1] / "app/running/route-shapes.json")
    args = parser.parse_args()
    exported = route_shapes(json.loads(args.runs.read_text()), json.loads(args.routes.read_text())["routes"])
    args.output.write_text(json.dumps(exported, separators=(",", ":")) + "\n")
