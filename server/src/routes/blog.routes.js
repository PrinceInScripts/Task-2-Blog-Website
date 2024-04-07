import { Router } from "express";
import { isUserLoggedIn } from "../middlewares/auth.middelwares.js";
import { upload } from "../middlewares/multer.middelwares.js";
import { createBlog, deleteBlog, editBlogDetials, editBlogImage, editBlogPage, getAllBlogs, getBlogDetials, getBlogsOfUser } from "../controller/blog.controllers.js";
import { checkBlogExist, checkUserAndBlogExist } from "../middlewares/blog.middelwares.js";

const router=Router()

router.route("/addBlog").post(isUserLoggedIn,upload.single('image'),createBlog)
router.route("/").get(getAllBlogs)
router.route("/user/blogs").get(isUserLoggedIn,getBlogsOfUser)
router.route("/:slug").get(getBlogDetials)
router.route("/edit-blog/:slug").get(isUserLoggedIn,checkBlogExist,checkUserAndBlogExist,editBlogPage)
router.route("/:slug/edit-blog-details").patch(isUserLoggedIn,checkBlogExist,checkUserAndBlogExist,editBlogDetials)
router.route("/:slug/edit-blog-image").patch(isUserLoggedIn,checkBlogExist,checkUserAndBlogExist,upload.single('image'),editBlogImage)
router.route("/:slug/delete-blog").delete(isUserLoggedIn,checkBlogExist,checkUserAndBlogExist,deleteBlog)

export default router;