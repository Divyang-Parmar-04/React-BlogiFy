const express = require("express")
const router = express.Router()
const blog = require("../model/blog")

//getblogs 
router.get("/api/auth/getblogs", async (req, res) => {
    try {
        const blogs = await blog.find()

        if(!blogs) return res.json({blogs:[]})
        return res.json({blogs:blogs}) 


    } catch (error) {
        console.log(error);
        return res.json({ blogs: false });
    }
});

//Delete blog

router.post("/api/delete/blog",async(req,res)=>{
   try {
       const {blogId} = req.body
       console.log(blogId)
       const currentBLog = await blog.findByIdAndDelete(blogId)
       if(currentBLog){
        return res.json({delete:true})
       }
       return res.json({delete:false})
   } catch (error) {
      return res.json({delete:false})
   }
})

module.exports = router
