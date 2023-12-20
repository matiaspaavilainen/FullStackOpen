const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    const className = type === 'success' ? 'success' : 'fail'

    return (
        <div className={`${className}`}>
            {message}
        </div>
    )
}

export default Notification