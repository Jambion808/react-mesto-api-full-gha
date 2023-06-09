class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
    // this._headers = headers;
  }

  getInfoAboutUser() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization : `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }).then(processResponse);
  }

  getCardsUser() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization : `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }).then(processResponse);
  }

  setInfoAboutUser(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization : `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(processResponse);
  }

  setAddUserCard(item) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization : `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    }).then(processResponse);
  }

  setLikes(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${id}/likes`,{
        method: "PUT",
        headers: {
          authorization : `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    ).then(processResponse);
  }

  deleteLike(id){
    const token = localStorage.getItem('jwt');
    return fetch(
      `${this._baseUrl}/cards/${id}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization : `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    ).then(processResponse);
  }

  deleteCard(id){
    const token = localStorage.getItem('jwt');
    return fetch(
      `${this._baseUrl}/cards/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization : `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    ).then(processResponse);
  }

  setUserAvatarProfile(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization : `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: data.avatar
      }),
    }).then(processResponse);
  }


}

const processResponse = (res) => {
  if (res.ok) {
    const response = res.json();
    // console.log(response);
    return response;
  }
  return Promise.reject(new Error("Ошибка"));
};

const api = new Api({ 
  baseUrl: "https://api.mesto.taro.nomoredomains.rocks",  
  headers: { 
    "Content-Type": "application/json", 
  }, 
}); 

export default api

