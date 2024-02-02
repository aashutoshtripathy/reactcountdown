export async function fetchAvailablePlaces() {
    const response = await fetch("http://localhost:30000/places");
        const resData = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch the places");
        }


        return resData.places;
}


export async function updateUserPlaces(places){
   



    try {
         const response = await fetch('http://localhost:30000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places}),
        headers: {
            'content-type': 'application/json'
        }
    })

    const resData = await response.json();

    if(!response.ok){
        throw new Error('Failed to update user data.');
    }

    return resData.message;
    } catch (error) {
     console.error('Error updating user places:' ,error)   
    }
}