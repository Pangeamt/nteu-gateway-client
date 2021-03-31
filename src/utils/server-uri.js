export default function serverUri () {
    var uri = ''
    if (process.env.NODE_ENV == 'development') {
        uri = process.env.VUE_APP_SERVER_URI
    } else {
        uri = location.origin
    }
    return uri + '/api/1.0.0'
}
