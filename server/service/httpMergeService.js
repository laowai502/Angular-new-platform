const superagent = require('superagent')

class HttpMergeService {
	queryAPI_Eins() { //天气
		const url = `http://webchat.faqrobot.org/servlet/api/apiservice?key=jiandanwentichaxun&state=weather&ip=59.46.97.114&type=json`;
		return new Promise((resolve, reject) => {
			superagent.get(url)
				.set("Content-Type", "application/json;charset=UTF-8")
				.end((err, res) => {
					if (err) {
						reject(err)
					} else {
						if (res.status === 200) {
							resolve(JSON.parse(res.text))
						} else {
							reject(err)
						}
					}
				})
		})
	}
	queryAPI_Zwei() { //bilibili 特别推荐
		const url = `https://www.bilibili.com/index/recommend.json`
		return new Promise((resolve, reject) => {
			superagent.get(url)
				.end((err, res) => {
					if (err) {
						reject(err)
					} else {
						if (res.status === 200) {
							resolve(JSON.parse(res.text))
						} else {
							reject(err)
						}
					}
				})
		})
	}
	queryAPI_Drei() { //qianqian_music
		const url = `http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&method=baidu.ting.billboard.billList&type=1&size=10&offset=0 `
		return new Promise((resolve, reject) => {
			superagent.get(url)
				.set("Content-Type", "application/json;charset=UTF-8")
				.end((err, res) => {
					if (err) {
						reject(err)
					} else {
						if (res.status === 200) {
							resolve(JSON.parse(res.text))
						} else {
							reject(err)
						}
					}
				})
		})
	}
	queryNICarTree() {
		const param = {
			engineType: -1,
			carType: -1,
			aakSalesStatus: -1,
			stdSalesStatus: -1,
			carStauts: 61,
			token: '0001e47bb3924d00a6b2afff0b36d431'
		}
		const url = `http://www.cnkaxingzhe.com/api/ni/monitor/car/querySearchTree`
		return new Promise((resolve, reject) => {
			superagent.get(url)
				.query(param)
				.set("Content-Type", "application/json;charset=UTF-8")
				.end((err, res) => {
					if (err) {
						reject(err)
					} else {
						if (res.status === 200) {
							resolve(JSON.parse(res.text))
						} else {
							reject(err)
						}
					}
				})
		})
	}
}

module.exports = new HttpMergeService()