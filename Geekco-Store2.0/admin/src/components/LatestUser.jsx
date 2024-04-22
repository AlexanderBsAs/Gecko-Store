const LatestUser = ({ users }) => {
    if (users.length === 0) {
        return null;
    }

    const lastUser = users[users.length - 1];

    const { image, first_name, last_name, email } = lastUser
    return (
        <div className="LatestUser">
            <h1>Último usuario registrado</h1>
            <h2>{first_name} {last_name}</h2>
            <img src={`http://localhost:3000/images/users/${image}`} />
            <div className="LatestProduct__description">
                <p>
                    {email}
                </p>
                </div>
        </div>
    )
}

export default LatestUser;