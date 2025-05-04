"use strict";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7271/chathub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

const start = async () => {
    try {
        await connection.start();
        console.log("Connected to signal r hub");
    } catch (error) {
        console.log(error);
    }
}

const joinChat = async (user) => {
    if (!user)
       return;
    try {
        const message = `${user} joined`;
        await connection.invoke("JoinChat", user, message);
    } catch (error) {
        console.log(error);
    }
}

// method for getting notified by server
const receiveMessage = async () => {
    const currentUser = "John Doe";
    if (!currentUser)
        return;
    try {
        await connection.on("ReceiveMessage", (user, message) => {
         appendReceivedMessage(user,message);
       })
    } catch (error) {
        console.log(error);
    }
}

const sendMessage = async (user,message) => {
    try {
        await connection.invoke('SendMessage', user, message);
        return "message sent successfully";
    } catch (error) {
        console.log(error);
    }
}

// starting the app
const startApp = async () => {
    await start(); // connection will stablised
    await receiveMessage();
}

startApp();

console.log('chat.js loaded successfully');