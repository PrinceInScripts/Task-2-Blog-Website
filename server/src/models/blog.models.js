import mongoose,{Schema} from 'mongoose'
import slugify from 'slugify'

const blogSchema=new Schema({
      title:{
        type:String,
        required:true
      },
      content:{
        type:String,
        required:true
      },
      image:{
        type:String,
        required:true
      },
      readTime:{
        type:Number,
        default:3
      },
      category:{
          type:String,
          required:true,
      },
      author:{
           type:Schema.Types.ObjectId,
           ref:"User"
      },
      slug:{
        type:String,
        unique:true
      },
},{timestamps:true})

blogSchema.pre("save",function (next){
  if(!this.isModified('title')) next()

  this.slug=this.makeSlug()

  next()
})


blogSchema.methods.makeSlug=function (){
  return slugify(this.title,{
    replacement:'-',
    remove:/[*+~.()'"!:@]/g,
    lower:true
  })
}

export const Blog=mongoose.model("Blog",blogSchema)