# SERVER SIDE WEB SOCKET FLOW

## CONNECTION LISTENER
1. Connection with 1 client established.
2. Get the client username.
3. Try to find a room with UNFILLLED status
4. IF YES: join client to that room. <ins>Emit</ins> to that room users that
   the game will start soon.
5. ELSE (no unfilled room): Create a new room. join the current
   client into that room and add this room to the rooms list.

> [!NOTE]
> Default room status is UNFILLED

## CLIENT WPM LISTENER (Inside the connection listener)  
> Basically this listener is attached to the socket that  
> is established on the with each client. While the connection listener  
> is setup on only the server, this listener listens to each socket  
> that is established.

1. Based on the socket.id we can determine which room is this
   socket connected with. Than in that room <ins>emit</ins> the data that each client
   is sending (is this room).


