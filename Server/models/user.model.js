import mongoose from 'mongoose';
import slugify from 'slugify'; // Install with `npm install slugify`

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  ConfirmedEmail: { type: Boolean, default: false },
  password: { type: String, required: false },
  googleId: { 
    type: String, 
    default: undefined, // Better than null
    sparse: true       // This is the key part
  },
  facebookId: { 
    type: String, 
    default: undefined,
    sparse: true 
  },


  isBuyer: { type: Boolean, required: true },
  profileImg: { 
    type: String, 
    required: false, 
    default: 'https://res.cloudinary.com/damicjacf/image/upload/v1728490158/_227d921a-77b1-4047-8480-964083c7dcf7_pttzxu.png',
  },
  coverImg: { 
    type: String, 
    required: false, 
    default: 'https://res.cloudinary.com/damicjacf/image/upload/v1728583460/MyCover_yngwcg.jpg',
  },
  desc: { type: String, required: false, default: '' },
  selectedOptions: { type: [String], required: false, default: [] },
  
  failedLoginAttempts: { type: Number, default: 0 },
  lastFailedAttempt: { type: Date, default: null },
  lockUntil: { type: Date, default: null },

  loginAttempts: [
    {
      status: { type: String, enum: ["success", "failed"], required: true },
      timestamp: { type: Date, default: Date.now },
      ip: { type: String },
      location: { type: String },
      device: { type: String },
      browser: { type: String },
    }
  ],

  resetCode: { type: String, default: null },
  resetCodeExpiry: { type: Date, default: null },
  phoneNumber: { type: String, required: false, default: '' },
  countryCode: { type: String, required: false, default: '+213' },
  birthMonth: { type: String, required: false, default: '' },
  birthDay: { type: String, required: false, default: '' },
  birthYear: { type: String, required: false, default: '' },
  country: { type: String, required: false, default: '' },
  gender: { type: String, required: false, default: '' },

  emailCode: { type: String, default: null },
  emailCodeExpiry: { type: Date, default: null },
  isProfileUpdated: { type: Boolean, default: false },
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],
  isVerified: { type: Boolean, default: false },

  sessions: [
    {
      sessionId: { type: String, required: true },
      device: { type: String },
      os: { type: String },
      browser: { type: String },
      ip: { type: String },
      location: { type: String },
      loginTime: { type: Date },
      lastActive: { type: Date },
      userAgent: { type: String },
    }
  ],

  tokenVersion: { type: Number, default: 0 },
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorMethod: { type: String, enum: ['email', 'phone'], default: null },
  twoFactorSecret: { type: String, default: null },
  twoFactorExpiry: { type: Date, default: null },

  phoneCode: { type: String, default: null },
  phoneCodeExpiry: { type: Date, default: null },
  isPhoneVerified: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  plan: {
    type: String,
    enum: ['free', 'freelancerPro', 'proPlus'],
    default: 'free'
  },
  remainingOffersFree: {
    type: Number,
    default: 15, // Default for free plan
  },
  remainingMessagesFree: {
    type: Number,
    default: 50, // Default for free plan
  },
  remainingOffersFreelancerPro: {
    type: Number,
    default: 40, // Default for freelancerPro plan
  },
  remainingOffersProPlus: {
    type: Number,
    default: Infinity, // Default for proPlus plan
  },
  planStartDate: { type: Date, default: Date.now }, // Stores when the plan starts
  planEndDate: { 
    type: Date, 
    default: function() {
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days later
    } 
  }, 


  secondaryEmail: { type: String, unique: true, sparse: true },
  ConfirmedSecondaryEmail: { type: Boolean, default: false },
  emailToVerify: { type: String },
  secondaryEmailToVerify: { type: String },
  secondaryEmailCode: { type: String },
  secondaryEmailCodeExpiry: { type: Date },
  lastActive: { type: Date, default: null },

  // Slug for SEO-friendly user profile URLs
  slug: { type: String, unique: true },
}, { timestamps: true });

// Generate a unique slug before saving the user
UserSchema.pre("save", async function (next) {
  if (!this.slug) {
    let baseSlug = slugify(`${this.firstName}-${this.lastName}`, { lower: true });
    let slug = baseSlug;
    let count = 1;

    // Ensure the slug is unique
    while (await mongoose.model('User').exists({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    this.slug = slug;
  }
  next();
});



export default mongoose.model('User', UserSchema);