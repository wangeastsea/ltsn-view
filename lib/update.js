// 用来放数据源的获取和更新
const axios = require('axios')
const color = require('cli-color')
const terminalLink = require('terminal-link')
const compareVersions = require('compare-versions')

module.exports = async (v) => {
    // 拿到所有的 Node 版本
    const { data } = await axios
        .get('https://nodejs.org/dist/index.json')

    // 把目标版本的 LTS 都挑选出来
    return data.filter(node => {
        const cp = v
            ? (compareVersions(node.version, 'v' + v + '.0.0') >= 0)
            : true
        return node.lts && cp
    }).map(it => {
        // 踢出去 file 这个字段，其他的全部返回
        const { files, ...rest } = it
        return { ...rest }
    })
}
