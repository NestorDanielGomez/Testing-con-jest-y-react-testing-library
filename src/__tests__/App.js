import React from "react";
import { fireEvent, getByText, render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

test("<App/>La aplicacion funciona correctamente", () => {
  render(<App />);
  expect(screen.getByText("Administrador de Mascotas")).toBeInTheDocument();
  expect(screen.getByTestId("nombre_app").textContent).toBe("Administrador de Mascotas");

  expect(screen.getByText("Crear Cita")).toBeInTheDocument();
  expect(screen.getByText("Administrador de Mascotas")).toBeInTheDocument();
});

test("<App/>Agrega cita y verifica heading", () => {
  render(<App />);
  userEvent.type(screen.getByTestId("mascota"), "Yaco");
  userEvent.type(screen.getByTestId("propietario"), "Nestor");
  userEvent.type(screen.getByTestId("fecha"), "2023-03-03");
  userEvent.type(screen.getByTestId("hora"), "10:30");
  userEvent.type(screen.getByTestId("sintomas"), "come mucho");

  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  const alerta = screen.queryByTestId("alerta");
  expect(alerta).not.toBeInTheDocument();

  expect(screen.getByTestId("titulo_dinamico").textContent).toBe("Administra tus Citas");
  expect(screen.getByTestId("titulo_dinamico").textContent).not.toBe("No hay Citas");
});

test("<App/>Agrega cita en el DOM", async () => {
  render(<App />);
  const citas = await screen.queryAllByTestId("cita");
  // console.log(citas.toString());
  // expect(citas).toMatchSnapshot();
  expect(screen.getByTestId("btn_eliminar").tagName).toBe("BUTTON");
  expect(screen.getByTestId("btn_eliminar")).toBeInTheDocument();

  expect(screen.getByText("Yaco")).toBeInTheDocument();
});

test("<App/>Elimina la cita", async () => {
  render(<App />);

  // console.log(citas.toString());
  // expect(citas).toMatchSnapshot();
  expect(screen.getByTestId("btn_eliminar").tagName).toBe("BUTTON");
  expect(screen.getByTestId("btn_eliminar")).toBeInTheDocument();

  //simulo el click
  userEvent.click(screen.getByTestId("btn_eliminar"));
  //el btn ya no va a estar

  expect(screen.queryByTestId("btn_eliminar")).not.toBeInTheDocument();
  expect(screen.queryByText("Yaco")).not.toBeInTheDocument();
  expect(screen.queryByText("cita")).not.toBeInTheDocument();
});
