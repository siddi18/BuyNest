import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import CryptoJS from "crypto-js"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
)

 userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
    // let hello = enteredPassword
    //     return true
 }

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})


// Assuming userSchema is defined elsewhere
userSchema.methods.createPasswordResetToken = function () {
  // Generate a random token
  const randomToken = CryptoJS.lib.WordArray.random(32);
  const resetToken = CryptoJS.enc.Hex.stringify(randomToken);

  // Hash the reset token using SHA-256
  const hashedToken = CryptoJS.SHA256(resetToken).toString(CryptoJS.enc.Hex);

  // Set the password reset token
  this.passwordResetToken = hashedToken;

  // Set the expiration time for the password reset token (10 minutes)
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // Return the unhashed reset token (if needed)
  return resetToken;
};


const User = mongoose.model("User", userSchema)

export default User
