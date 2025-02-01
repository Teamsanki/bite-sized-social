import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "like",
    user: {
      name: "John Doe",
      avatar: "",
    },
    time: "2h ago",
    content: "liked your post",
  },
  {
    id: 2,
    type: "follow",
    user: {
      name: "Jane Smith",
      avatar: "",
    },
    time: "5h ago",
    content: "started following you",
  },
];

const Notifications = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="space-y-4">
        {MOCK_NOTIFICATIONS.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm"
          >
            <Avatar>
              <AvatarImage src={notification.user.avatar} />
              <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p>
                <span className="font-medium">{notification.user.name}</span>{" "}
                {notification.content}
              </p>
              <p className="text-sm text-gray-500">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;