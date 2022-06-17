const Message = ({creator, body, created_timestamp_UTC}) => {


    return (
        <article>
            <h3>{creator}</h3>
            <p>{body}</p>
            <time>{created_timestamp_UTC}</time>
        </article>
    )
}

export default Message;