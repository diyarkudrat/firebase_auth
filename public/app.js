document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    
    const db = firebase.firestore();

    // const myPost = db.collection('posts').doc('firstpost');

    // myPost.onSnapshot(doc => {

    //         const data = doc.data();
    //         document.write( data.title + '<br>')
    //         document.write( data.createdAt + '<br>' )

    //     })

    const productsRef = db.collection('products');

    // Specify products where its price is greater than or equal to 10
    // Can change operator """

    // const query = productsRef.where('price', '>=', 10)

    const query = productsRef.orderBy('price', 'desc').limit(4)

    query.get()
        .then(products => {
            products.forEach(doc => {
                data = doc.data()
                document.write(`${data.name} at $${data.price} <br>`)
            })
        })
    
})

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.write(`Hello ${user.displayName}`);
            console.log(user)
        })
        .catch(console.log)
}

function updatePost(e) {
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');
    myPost.update({ title: e.target.value })
}
