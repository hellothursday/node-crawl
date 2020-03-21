import axios from 'axios'
import cheerio from 'cheerio'

interface Course {
    title: string,
    count: number
}

class Crawller {
    private url = 'https://coding.imooc.com/?c=photo'

    constructor() {
        this.crawl()
    }

    async crawl() {
        const html = await this.getRawHTML()
        const data = this.analyze(html)
        console.log(data)
    }

    async getRawHTML() {
        const result = await axios.get(this.url)
        return result.data
    }

    analyze(html: string) {
        const data: Course[] = []
        const $ = cheerio.load(html)
        const $course = $('.shizhan-course-wrap')
        $course.map((index, element) => {
            const $element = $(element)
            const $title = $element.find('.shizan-name')
            const $info = $element.find('.shizhan-info span')
            const len = $info.length
            const $count = $info.eq(len - 2)
            const title = $title.text()
            const count = parseInt($count.text())
            data.push({
                title,
                count
            })
        })
        return data
    }
}

new Crawller()