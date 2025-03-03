import { defineError } from '../utils/defineError'

const config = {
    clientId: 'c511a42eba8d440486897ffd586fde04',
    host: 'https://cloud-api.yandex.net/v1/disk/resources',
}

const mode = {}

export default class YandexDrive {

    static uploadFile = async (file, path) => {
        try {
            const OAuthToken = await this._getOAuthToken()

            // get url for upload IN response
            const response = await fetch(`${config.host}/upload?path=${path}&overwrite=true`, {
                method: 'GET',
                headers: {
                    Authorization: `OAuth ${OAuthToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })

            const urlForUpload = await response.json()

            await fetch(urlForUpload.href, {
                method: urlForUpload.method,
                body: file,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            console.log(defineError(error.error || error.message))
        }
    }

    static _getOAuthToken = async () => {
        // ПОЛУЧЕНИЕ ОТЛАДОЧНОГО ТОКЕНА
        try {
            // return 'y0_AgAAAABkQX6fAAqEDwAAAADtCKX6uZ5MXVH0RwKeQFAFsoyHGy5Pnzw'
            return 'y0__xCf_YWiBhiPiCoguaLPtxKbF6VYiP_TF6rYRSCJSATFzfxcyA'
        } catch (error) {
            console.log(defineError(error.error || error.message))
        }
    }

    static createFolder = async path => {
        try {
            const OAuthToken = await this._getOAuthToken()
            await fetch(`${config.host}?path=${path}`, {
                method: 'PUT',
                headers: {
                    Authorization: `OAuth ${OAuthToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            console.log(defineError(error.error || error.message))
        }
    }

    static downloadFile = async path => {
        try {
            const OAuthToken = await this._getOAuthToken()

            // get link to download link IN response
            const response = await fetch(`${config.host}/download?path=${path}`, {
                method: 'GET',
                headers: {
                    Authorization: `OAuth ${OAuthToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })

            const linkToGetDownloadLink = await response.json()

            const downloadLink = await fetch(linkToGetDownloadLink.href)
            return downloadLink.url
        } catch (error) {
            console.log(error)
            console.log(defineError(error.error || error.message))
        }
    }

}