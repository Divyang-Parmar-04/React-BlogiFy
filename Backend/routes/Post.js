const express = require("express")
const router = express.Router()
const blog = require("../model/blog")


// create blog 
router.post("/api/createblog", async (req, res) => {
    try {

        const { title, content, imgUrl, blogType, summary, userName } = req.body
        const newblog = await blog.create({
            title,
            imgUrl,
            content,
            blogType,
            summary,
            userName,

        })
        // console.log(newblog)
        return res.json({ blog: newblog })
    } catch (error) {
        return res.json({ blog: false })
    }
})

// update blog 
router.post("/api/updateblog", async (req, res) => {
    try {
        const { title, imgUrl, summary, blogType, content, blogId } = req.body

        const data = await blog.findByIdAndUpdate(blogId, { title, imgUrl, summary, blogType, content },{new:true})
        // console.log(data)
        if (data) return res.json({ blog: data })

    } catch (error) {
        return res.json({ blog: false })
    }
})

router.post('/api/deleteblog',async(req,res)=>{
    try {
        const {id} = req.body
        const BLOG = await blog.findByIdAndDelete(id)
        if(!BLOG) return res.json({blog:false})
        return res.json({blog:true})

    } catch (error) {
        // console.log(error)
        return res.json({ blog: false })
    }
})

module.exports = router