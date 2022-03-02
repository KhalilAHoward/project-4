import tokenService from './tokenService';

const BASE_URL = '/api/games';

export function create(game) {
    return fetch(BASE_URL, {
      method: 'POST',
      body: game,
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    
    }).then(res =>{
        if (res.ok) return res.json()
        throw new Error('Error submitting the Form. Check Express Terminal')
    }) 
}

export function getAll(){
    return fetch(BASE_URL, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    })
    .then(res => res.json());
}