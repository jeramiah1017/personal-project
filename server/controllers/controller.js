// const fetch = require('isomorphic-fetch')

module.exports = {
  addFave: (req, res) => {
    const db = req.app.get("db");
    const { name, image, key } = req.body;
    console.log(req.session.user);
    const user_id = db
      .add_fave({ name, image, key, user_id: req.session.user.user_id })
      // req.session.user = {user_id: user_id[0].user_id}
      .then(result => res.status(200).send("thats a good one"))
      .catch(err => {
        console.log({ err });
      });
  },
  getFaves: (req, res) => {
    const db = req.app.get("db");
    console.log(req.session.user);
    db.get_fave({ user_id: req.session.user.user_id })
      // console.log(req.session)
      .then(result => res.status(200).send(result))
      .catch(err => {
        console.log(err);
      });
  },
  deleteF: (req, res) => {
    const db = req.app.get("db");
    const {favorites_id} = req.params;
    console.log(req.params)
    db.delete_fav([favorites_id]).then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
        console.log(err)
    })
  },
}
//   getEncrypt: async (req, res) => {
//     await fetch(
//       "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/q?api_key=RGAPI-2d69d28e-b39b-4c09-ae86-72499e48983b"
//     )
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// };
