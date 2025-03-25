// ClientTable.js
import React from 'react';
import './ClientTable.css';

const ClientTable = () => {
    const clients = [
        {
            id: 20439,
            name: "John Doe",
            username: "johndoe1",
            broker: "Century 21 Town & Country",
            cityState: "Northville, MI",
            tours: "1 Tour",
            info: {
                email: "johndoe@gmail.com",
                phone: "(205) 625-1234"
            },
            joined: "10/09/2016",
            actions: ["Tours", "Order"]
        },
        // Add more client objects as needed
    ];

    return (
        <div className="client-table">
            {clients.map((client, index) => (
                <div key={index} className="client-row">
                    <div className="client-id">{client.id}</div>
                    <div className="client-name">
                        <img src="path/to/avatar.png" alt="Avatar" className="avatar" />
                        {client.name}
                    </div>
                    <div className="client-username">@{client.username}</div>
                    <div className="client-broker">{client.broker}</div>
                    <div className="client-city-state">{client.cityState}</div>
                    <div className="client-tours">{client.tours}</div>
                    <div className="client-info">
                        <span>{client.info.email}</span>
                        <span>{client.info.phone}</span>
                    </div>
                    <div className="client-joined">{client.joined}</div>
                    <div className="client-actions">
                        {client.actions.map((action, idx) => (
                            <button key={idx} className="action-button">{action}</button>
                        ))}
                        <button className="delete-button">Delete Client</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ClientTable;