const mongoose = require('mongoose')


const bookTitleSchema = new mongoose.Schema({
  book_title:{
    type:String,
    required:true,
    min:1,
    max:255,
  },
  category:{
    type:String,
    required:true,
    min:1,
    max:255,
  },
  user_email:{
    type:String,
    required:true,
    min:1,
    max:255,
  },
  user_id:{
    type:String,
    required:true,
    min:1,
    max:255,
  },
  division:{
    type:String,
    required:true,
    min:1,
    max:255,
    default:'내자료'
  },
  user_nick:{
    type:String,
    required:true,
    min:1,
    max:255
  },
  total_pages:{
    type:Number,
    required:true,
    max:255,
    default:0
  },
  recent_input:{
    type:Number,
    required:true,
    max:255,
    default:0
  },
  single_cards:{
    type:Number,
    required:true,
    max:255,
    default:0
  },
  dual_cards:{
    type:Number,
    required:true,
    max:255,
    default:0
  },
  like:{
    type:String,
    required:true,
    min:1,
    max:255,
    default:'NO'
  },
  like_order:{
    type:Number,
    required:true,
    max:255,
    default:0
  },
  list_order:{
    type:Number,
    required:true,
    max:255,
    default:0
  },
  hide_or_show:{
    type:String,
    required:true,
    min:1,
    max:255,
    default:'show'
  },
  date:{
    type:Date,
    default:Date.now
  },
  update_date:{
    type:Date,
    default:Date.now
  }
})

const BookTitle =  mongoose.model('BookTitle', bookTitleSchema)

module.exports = { BookTitle }