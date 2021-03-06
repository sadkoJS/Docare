import fs from "fs"
import { getRandomString } from "./utilities"

let doctors = []

const saveDoctors = () => {
  if (process.env.NOFS !== undefined) {
    return
  }
  fs.writeFileSync("src/doctors.json", JSON.stringify(doctors, null, 2))
}
export const loadDoctors = () => {
  if (process.env.NOFS !== undefined) {

    return
  }
  doctors = JSON.parse(fs.readFileSync("src/doctors.json"))
}

export const getDocById = (docId) => {
  for (let i = 0; i < doctors.length; i++) {
    if (doctors[i].id === docId) {
      return doctors[i]
    }
  }
  return null
}

export const findDoc = (email, pass) => {
  for (let i = 0; i < doctors.length; i++) {
    if (doctors[i].email === email && doctors[i].password === pass) {
      return {
        id: doctors[i].id,
        name: doctors[i].name,
        image: doctors[i].image,
      }
    }
  }
  return null
}

const doesEmailExists = (email) => {
  for (let i = 0; i < doctors.length; i++) {
    if (doctors[i].email === email) {
      return true
    }
  }
  return false
}
export const addDoctor = (email, password, name) => {
  if (doesEmailExists(email)) {
    return null
  }
  const newdoc = {
    id: getRandomString(),
    name: name,
    email: email,
    image: "images/GYVC2191.JPG",
    password: password,
  }
  doctors.push(newdoc)
  saveDoctors()
  return {
    id: newdoc.id,
    name: newdoc.name,
    image: newdoc.image,
  }
}
