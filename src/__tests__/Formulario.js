import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Formulario from "../components/Formulario";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

const crearCita = jest.fn();

test(`<Formulario/> Cargar formulario y chequear que todo sea correcto`, () => {
  //   const wrapper = render(<Formulario />);
  //   wrapper.debug();
  render(<Formulario crearCita={crearCita} />);
  expect(screen.getByText("Crear Cita")).toBeInTheDocument();
  expect(screen.getByTestId("titulo").tagName).toBe("H2");
  expect(screen.getByTestId("titulo").tagName).not.toBe("H1");
  expect(screen.getByTestId("titulo").textContent).toBe("Crear Cita");

  expect(screen.getByTestId("btn-submit").tagName).toBe("BUTTON");
});

test(`<Formulario/> Validar formulario0`, () => {
  render(<Formulario crearCita={crearCita} />);
  const btnSubmit = screen.getByTestId("btn-submit");
  fireEvent.click(btnSubmit);

  const alerta = screen.getByTestId("alerta");
  expect(alerta).toBeInTheDocument();
  expect(alerta.textContent).toBe("Todos los campos son obligatorios");
  expect(alerta.tagName).toBe("P");
});

test(`<Formulario/> LLenar formulario0`, () => {
  render(<Formulario crearCita={crearCita} />);

  userEvent.type(screen.getByTestId("mascota"), "Yaco");
  userEvent.type(screen.getByTestId("propietario"), "Nestor");
  userEvent.type(screen.getByTestId("fecha"), "2023-03-03");
  userEvent.type(screen.getByTestId("hora"), "10:30");
  userEvent.type(screen.getByTestId("sintomas"), "come mucho");

  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  const alerta = screen.queryByTestId("alerta");
  expect(alerta).not.toBeInTheDocument();

  //creo cita y valido que se haya creado
  expect(crearCita).toHaveBeenCalled();
  expect(crearCita).toHaveBeenCalledTimes(1);
});
