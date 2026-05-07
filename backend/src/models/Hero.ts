import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String, required: true },
  slug: { type: String },
  powerstats: {
    intelligence: { type: Number, default: 0 },
    strength: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
    durability: { type: Number, default: 0 },
    power: { type: Number, default: 0 },
    combat: { type: Number, default: 0 },
  },
  appearance: {
    gender: { type: String },
    race: { type: String },
    height: [{ type: String }],
    weight: [{ type: String }],
    eyeColor: { type: String },
    hairColor: { type: String }
  },
  biography: {
    fullName: { type: String },
    alterEgos: { type: String },
    aliases: [{ type: String }],
    placeOfBirth: { type: String },
    firstAppearance: { type: String },
    publisher: { type: String }, // "univers"
    alignment: { type: String }
  },
  work: {
    occupation: { type: String },
    base: { type: String }
  },
  connections: {
    groupAffiliation: { type: String },
    relatives: { type: String }
  },
  images: {
    xs: { type: String },
    sm: { type: String },
    md: { type: String },
    lg: { type: String }
  },
  customImage: { type: String } // Pour l'upload d'images
}, { timestamps: true });

const Hero = mongoose.model('Hero', heroSchema);
export default Hero;
