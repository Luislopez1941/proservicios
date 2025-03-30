"use client"

import { useEffect, useState } from "react"
import users from "./json/users.json"
import "./Messages.css"
import Chat from "./chat/page"
import APIs from "@/services/APIS"
import useUserStore from "@/zustand/UserStore"
import { storeChats } from "@/zustand/Chats"
import { useRouter } from 'next/navigation'
import Menu from "@/components/Menu"


interface UserInfo {
  id: number;
  name: string;
  email: string;
  typeUser: string;
  token: string;

};

const Page = () => {
  const userState = useUserStore(state => state.user);
  const userGlobal: UserInfo = userState;

  const router = useRouter()

  const setDataChat = storeChats(state => state.setDataChat)
  const setUsersChat = storeChats(state => state.setUsersChat)


  const [active, setActive] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<number | null>(null)

  const handleUserClick = (index: number) => {
    setSelectedUser(index)
    setActive(true)
  }

  const [chatsTransmitter, setChatsTransmitter] = useState<any>([])
  const [chatsReceiver, setChatsReceiver] = useState<any>([])
  const fetch = async () => {
    try {
      let response: any = await APIs.getAllChatsForUser(userGlobal.id)
      setChatsTransmitter(response.data)

    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }


  useEffect(() => {
    fetch()
  }, [])

  const changeRoute = async (user: any) => {
    console.log(user)

    let chatId = user.chat_id;
    let userId = user.user_id;
    try {
      const response: any = await APIs.getChatParticipant(chatId, userId);
      setDataChat(response.data)
      setUsersChat(user)
      console.log('response', response); // Asegúrate de que los datos estén llegando correctamente
      router.push('/messages/chat')

    } catch (error) {
      console.error('Error fetching chat data:', error); // Manejo de error
    }
  }

  return (
    <div>
      
      <div className="messages">
        <div className="row__one">
          <div className="header">
            <p className="title">Mensajes</p>
          </div>
          <div className="content">
            <div className="inputs__general_icons">
              <input className="inputs__generic" type="text" placeholder="Buscar" />
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
            </div>
          </div>
        </div>
        <div className="messages__container">
          <div className="row__two">
            <div className="users__container">
              {chatsTransmitter.map((user: any, index: number) => (
                <div
                  className={`user ${selectedUser === index ? "active" : ""}`}
                  key={user.user_id}
                  onClick={() => { handleUserClick(index); changeRoute(user); }}
                >{userGlobal?.id == user?.user_id ?
                  <div className="image_user" style={{ backgroundImage: user?.user2?.profilePhoto ? `url(${user.user2?.profilePhoto})` : 'none', }}></div>
                  :
                  <div className="image_user" style={{ backgroundImage: user?.user1?.profilePhoto ? `url(${user.user1?.profilePhoto})` : 'none', }}></div>
                  }
                  {userGlobal?.id == user?.user_id ?
                    <div className="content">
                      <h3>{user?.user2?.first_name}</h3>
                      <h3>{user?.user2?.first_surname}</h3>
                    </div>
                    :
                    <div className="content">
                      <h3>{user?.user1?.first_name}</h3>
                      <h3>{user?.user2?.first_surname}</h3>
                    </div>
                  }
                  <p>{user.description}</p>

                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row__three">{/* Footer content can go here */}</div>
      </div>
      <Menu />
    </div>
  )
}

export default Page

