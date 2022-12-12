import { WebPlugin } from '@capacitor/core';
import * as Kakao from './assets/kakao';
export class Capacitor3KakaoLoginWeb extends WebPlugin {
    initializeKakao(options) {
        return new Promise(resolve => {
            if (!this.web_key) {
                this.web_key = options.web_key;
                Kakao.init(this.web_key);
            }
            resolve({ value: 'done' });
        });
    }
    //웹 카카오 로그인
    kakaoLogin() {
        return new Promise((resolve, reject) => {
            if (!this.web_key) {
                reject('kakao_sdk_not_initialzed');
            }
            const KakaoSdk = Kakao;
            KakaoSdk.Auth.login({
                success: function (authObj) {
                    let { access_token } = authObj;
                    resolve({ value: access_token });
                },
                fail: function (err) {
                    console.error(err);
                    reject(err);
                },
            });
        });
    }
    //웹 로그아웃
    kakaoLogout() {
        return new Promise((resolve, reject) => {
            if (!this.web_key) {
                reject('kakao_sdk_not_initialzed');
            }
            const KakaoSdk = Kakao;
            KakaoSdk.Auth.logout();
            resolve({ value: 'done' });
        });
    }
    //unlink
    kakaoUnlink() {
        return new Promise((resolve, reject) => {
            if (!this.web_key) {
                reject('kakao_sdk_not_initialzed');
            }
            const KakaoSdk = Kakao;
            KakaoSdk.API.request({
                url: '/v1/user/unlink',
                success: function (response) {
                    console.log(response);
                    resolve({ value: 'done' });
                },
                fail: function (error) {
                    console.log(error);
                    reject(error);
                },
            });
        });
    }
    //message
    sendLinkFeed(options) {
        return new Promise((resolve, reject) => {
            if (!this.web_key) {
                reject('kakao_sdk_not_initialzed');
            }
            const KakaoSdk = Kakao;
            KakaoSdk.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: options.title,
                    description: options.description,
                    imageUrl: options.image_url,
                    link: {
                        mobileWebUrl: options.image_link_url,
                    },
                },
                buttons: [
                    {
                        title: options.button_title,
                        link: {
                            mobileWebUrl: options.image_link_url,
                        },
                    },
                ],
                callback: function () {
                    resolve({ value: 'done' });
                },
            });
        });
    }
}
//# sourceMappingURL=web.js.map