ARCHITECTURE DESIGN
Client ------> API ----->Service -----> DB
               |
               v
             Queue -----> Worker


The client sends a request to the API layer, which handles validation and routing. The request is then passed to the service layer, where the core business logic is applied. The service interacts with the database to store or retrieve necessary data. For tasks that do not need immediate execution, such as sending notifications, the service pushes them to a queue. A worker continuously listens to this queue and processes these tasks asynchronously, ensuring better performance and scalability of the system.

OUTPUT SS

<img width="1600" height="756" alt="WhatsApp Image 2026-05-02 at 12 17 28 PM" src="https://github.com/user-attachments/assets/3790258f-f78f-4315-aac7-deb1550ba91d" />

<img width="1600" height="759" alt="WhatsApp Image 2026-05-02 at 12 17 30 PM" src="https://github.com/user-attachments/assets/5cdaa7fd-26cd-4669-adf2-6d61fefe3472" />

<img width="1600" height="804" alt="WhatsApp Image 2026-05-02 at 11 51 09 AM" src="https://github.com/user-attachments/assets/b3e8f994-cc76-4607-a4e8-fe07261228a5" />

<img width="1600" height="788" alt="WhatsApp Image 2026-05-02 at 12 20 37 PM" src="https://github.com/user-attachments/assets/43231e73-fac4-49b9-9258-86fa79ba1529" />

<img width="1600" height="762" alt="WhatsApp Image 2026-05-02 at 12 20 38 PM (1)" src="https://github.com/user-attachments/assets/485e58f7-07f3-4a47-aa1c-6b345a728fe9" />

<img width="1600" height="749" alt="WhatsApp Image 2026-05-02 at 12 20 38 PM" src="https://github.com/user-attachments/assets/24c8ef81-b6c7-4659-9d40-39a0f9f79a1c" />

