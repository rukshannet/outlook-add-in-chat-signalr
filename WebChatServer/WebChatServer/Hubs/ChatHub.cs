using Microsoft.AspNetCore.SignalR;

namespace WebChatServer.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user,string messagegroup, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage",user, messagegroup, message);
        }

        public async Task JoinChat(string user, string message)
        {
            await Clients.Others.SendAsync("ReceiveMessage", user, message);
        }
    }
}
