export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    config.headers.common["Authorization"] = process.env.BASIC_AUTH
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect("/400")
    }
  })
}
