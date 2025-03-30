"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import "./page.css"
import APIs from "@/services/APIS"
import { MapPin, Apple } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface FormData {
  first_name: string
  first_surname: string
  phone: string
  email: string
  password: string
  id_state: number | null
  id_locality: number | null
  id_municipality: number | null
  acceptTerms: boolean
}

interface State {
  id: number
  name: string
}

interface City {
  id: number
  name: string
  id_state: number
}

interface Municipality {
  id: number;
  name: string;
  id_locality: number;
  type: string;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    first_surname: "",
    phone: "",
    email: "",
    password: "",
    id_state: null,
    id_locality: null,
    id_municipality: null,
    acceptTerms: false,
  })

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      acceptTerms: e.target.checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.acceptTerms) {
      alert("Debes aceptar los términos y condiciones para continuar")
      return
    }

    try {
      await APIs.customerRegistration(formData)
      router.push("/join/success")
    } catch (error) {
      console.error("Error during registration:", error)
    }
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
    // Implement social login logic here
  }

  const [next, setNext] = useState<number>(0)
  const [selectState, setSelectState] = useState<boolean>(false)
  const [states, setStates] = useState<State[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [municipalities, setMunicipalities] = useState<Municipality[]>([])

  const fetchStates = async () => {
    try {
      const resultStates: any = (await APIs.getStates()) as State[]
      setStates(resultStates.data)
    } catch (error) {
      console.error("Error fetching states:", error)
    }
  }

  useEffect(() => {
    fetchStates()
  }, [])


  ////////////////////////////State//////////////////////////////////////////

  const handleStatesChange = async (state: State) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id_state: state.id,
    }))
    try {
      const result: any = (await APIs.getMunicipalities(state.id)) as Municipality[]
      setMunicipalities(result.data)
    } catch (error) {
      console.error("Error fetching cities:", error)
    }
    setSelectState(false)
  }



  ////////////////////////////Municipality//////////////////////////////////////////

  const [selectMunicipality, setSelectMunicipality] = useState<boolean>(false)
  const [localities, setLocalities] = useState<any>()

  const openSelectMunicipality = () => {
    setSelectMunicipality((prev) => !prev)
  }


  const handleMunicipalityChange = async (municipality: Municipality) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id_municipality: municipality.id,
    }))

    try {
      const result: any = (await APIs.getLocalities(municipality.id)) as Municipality[]
      setLocalities(result.data)
    } catch (error) {
      console.error("Error fetching cities:", error)
    }
    setSelectMunicipality(false)
  }



  ///////////////////////////////Locality/////////////////////////////////////////

  const [selectLocality, setSelectLocality] = useState<boolean>(false)

  const openSelectLocalities = () => {
    setSelectLocality((prev) => !prev)
  }

  const handleLocalitiesChange = async (locality: City) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id_locality: locality.id,
    }))
  
    setSelectLocality(false)
  }



  const openSelectStore = () => {
    setSelectState(!selectState)
  }


  const handleNextStep = () => {
    if (!formData.first_name || !formData.first_surname || !formData.email || !formData.password || !formData.phone) {
      alert("Por favor completa todos los campos")
      return
    }

    if (!formData.acceptTerms) {
      alert("Debes aceptar los términos y condiciones para continuar")
      return
    }

    setNext(1)
  }

  return (
    <div className="join">
      <div className="join__container">
        <div className="left">
          <div>{/* Puedes agregar contenido adicional aquí */}</div>
        </div>
        <div className="right">
          <AnimatePresence>
            <div>
              {next === 0 ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: "linear", duration: 1.5 }}
                  className="form__join"
                >
                  <div className="form-header_join">
                    <div className="titles">
                      <h2 className="title__main">Crear cuenta</h2>
                      <div className="title__warning">
                        <p>Unete y se parte de nuestra comunidad de profesionales.</p>
                      </div>
                    </div>
                  </div>

                  <div className="social-login_join">
                    <div className="container__buttons">
                      <button className="social-button_join google-button_join" type="button" onClick={() => handleSocialLogin("google")} >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"> <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /> <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /> <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /> <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /> <path d="M1 1h22v22H1z" fill="none" /> </svg> <span>Continuar con Google</span>
                      </button>
                      <button className="social-button_join apple-button_join" type="button" onClick={() => handleSocialLogin("apple")}>
                        <Apple size={24} />
                        <span>Continuar con Apple</span>
                      </button>
                    </div>
                    <div className="separator_join">
                      <span>o</span>
                    </div>
                  </div>

                  <div className="form__join_container">
                    <div className="row__one">
                      <input
                        className="inputs__general"
                        type="text"
                        name="first_name"
                        placeholder="Primer nombre"
                        value={formData.first_name}
                        onChange={handleChange}
                        autoComplete="given-name"
                        required
                      />
                      <input
                        className="inputs__general"
                        type="text"
                        name="first_surname"
                        placeholder="Primer apellido"
                        value={formData.first_surname}
                        onChange={handleChange}
                        autoComplete="family-name"
                        required
                      />
                    </div>
                    <div className="row__two">
                      <input
                        className="inputs__general"
                        type="email"
                        name="email"
                        placeholder="Correo electronico"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                      />
                      <input
                        className="inputs__general"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                      />
                    </div>
                    <div className="row__three">
                      <input
                        className="inputs__general"
                        type="text"
                        name="phone"
                        placeholder="Numero telefonico"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        required
                      />
                    </div>

                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="terms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="terms">
                        Acepto los <a href="#">Términos y Condiciones</a> y la <a href="#">Política de Privacidad</a>
                      </label>
                    </div>

                    <button type="button" className="submit-button" onClick={handleNextStep}>
                      Crear cuenta
                    </button>

                    <div className="login-link">
                      <p>
                        ¿Ya tienes una cuenta?{" "}
                        <Link href="/login" className="text-link">
                          Iniciar sesión
                        </Link>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="location"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: "linear", duration: 1.5 }}
                  className={`form__join-finally`}
                >
                  <div className="btn-back" onClick={() => setNext(0)}>
                    Regresar
                  </div>
                  <p className="title">Ubicacion</p>
                  <p>Seleciona tu localidad para prestar tus servcios como profecional</p>
                  <form onSubmit={handleSubmit}>
                    <div className="select__container">
                      <div className="select-btn__general">
                        <div className={`select-btn ${selectState ? "active" : ""}`} onClick={openSelectStore}>
                          <MapPin strokeWidth={1.5} />
                          <div>
                            <p>
                              {formData.id_state ? states.find((s) => s.id === formData.id_state)?.name : "Selecciona"}
                            </p>
                            <svg
                              className="chevron__down"
                              fill="#6c6c6e"
                              xmlns="http://www.w3.org/2000/svg"
                              height="16"
                              width="16"
                              viewBox="0 0 512 512"
                            >
                              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                            </svg>
                          </div>
                        </div>
                        <div className={`content ${selectState ? "active" : ""}`}>
                          <ul
                            className={`options ${selectState ? "active" : ""}`}
                            style={{ opacity: selectState ? "1" : "0" }}
                          >
                            {states?.map((state) => (
                              <li key={state.id} onClick={() => handleStatesChange(state)}>
                                {state.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="select__container my-4">
                      <div className="select-btn__general">
                        <div className={`select-btn ${selectMunicipality ? "active" : ""}`} onClick={openSelectMunicipality}>
                          <MapPin strokeWidth={1.5} />
                          <div>
                            <p>{formData.id_municipality ? municipalities.find((s) => s.id === formData.id_municipality)?.name : "Ciudad"}</p>
                            <svg
                              className="chevron__down"
                              fill="#6c6c6e"
                              xmlns="http://www.w3.org/2000/svg"
                              height="16"
                              width="16"
                              viewBox="0 0 512 512"
                            >
                              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                            </svg>
                          </div>
                        </div>
                        <div className={`content ${selectMunicipality ? "active" : ""}`}>
                          <ul
                            className={`options ${selectMunicipality ? "active" : ""}`}
                            style={{ opacity: selectMunicipality ? "1" : "0" }}
                          >
                            {municipalities?.map((municipality: any) => (
                              <li key={municipality.id} onClick={() => handleMunicipalityChange(municipality)}>
                                {municipality.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="select__container">
                      <div className="select-btn__general">
                        <div
                          className={`select-btn ${selectLocality ? "active" : ""}`}
                          onClick={openSelectLocalities}
                        >
                          <MapPin strokeWidth={1.5} />
                          <div>
                            <p>
                              {formData.id_locality
                                ? localities?.find((s: any) => s.id === formData.id_locality)?.name
                                : "Localidad"}
                            </p>
                            <svg
                              className="chevron__down"
                              fill="#6c6c6e"
                              xmlns="http://www.w3.org/2000/svg"
                              height="16"
                              width="16"
                              viewBox="0 0 512 512"
                            >
                              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                            </svg>
                          </div>
                        </div>
                        <div className={`content ${selectLocality ? "active" : ""}`}>
                          <ul
                            className={`options ${selectLocality ? "active" : ""}`}
                            style={{ opacity: selectLocality ? "1" : "0" }}
                          >
                            {localities?.map((locality: any) => (
                              <li key={locality.id} onClick={() => handleLocalitiesChange(locality)}>
                                {locality.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="container__btn">
                      <button className="btn__create-join" type="submit">
                        Finalizar
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Page

