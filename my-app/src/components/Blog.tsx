import { BlogProps } from './types'

export default function Blog(props: BlogProps) {
  return (
    <article>
      <h1>{props.title}</h1>
      {/* <h2>{props.description}</h2> */}
      <p>
        {/* {props.publishedAt} */}
      </p>
      {/* <img alt={props.title} src={props.cover} width="100%" loading="lazy" />
      {props.children} */}
    </article>
  )
}