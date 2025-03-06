import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Blog from "./Blog";
import BlogForm from "../components/BlogForm";

describe("Blog component", () => {
  const blog = {
    title: "React Testing",
    author: "John Doe",
    url: "http://example.com",
    likes: 5,
    user: { name: "Admin" },
  };

  it("muestra el título y el autor del blog pero no la URL ni los likes por defecto", () => {
    render(<Blog blog={blog} handleLike={() => {}} handleDelete={() => {}} />);

    // Verificar que el título y el autor están en el documento
    expect(screen.getByTestId("blog-title")).toHaveTextContent("React Testing");
    expect(screen.getByTestId("blog-author")).toHaveTextContent("John Doe");

    // Verificar que la URL y los likes no se muestran
    expect(screen.queryByText("URL: http://example.com")).toBeNull();
    expect(screen.queryByText("Likes: 5")).toBeNull();
  });
});

describe("Blog component", () => {
  it("muestra la URL y los likes solo después de hacer clic en 'View'", () => {
    const blog = {
      title: "React Testing",
      author: "John Doe",
      url: "https://react-testing.com",
      likes: 10,
      user: { name: "Test User" },
    };

    render(<Blog blog={blog} handleLike={() => {}} handleDelete={() => {}} />);

    // Verificar que el título y el autor están visibles desde el inicio
    expect(screen.getByTestId("blog-title")).toHaveTextContent("React Testing");
    expect(screen.getByTestId("blog-author")).toHaveTextContent("John Doe");

    // Verificar que la URL y los likes **NO** están visibles antes de hacer clic
    expect(
      screen.queryByText("URL: https://react-testing.com")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Likes: 10")).not.toBeInTheDocument();

    // Hacer clic en el botón "View"
    const viewButton = screen.getByText("View");
    fireEvent.click(viewButton);

    // 📌 4️⃣ Ahora la URL y los likes deben aparecer
    expect(
      screen.getByText("URL: https://react-testing.com")
    ).toBeInTheDocument();
    expect(screen.getByText("Likes: 10")).toBeInTheDocument();
  });
});

describe("Blog component", () => {
  it("llama dos veces a handleLike cuando se hace clic dos veces en el botón Like", () => {
    const blog = {
      title: "React Testing",
      author: "John Doe",
      url: "https://react-testing.com",
      likes: 10,
      user: { name: "Test User" },
    };

    // Mock de la función handleLike
    const mockHandleLike = vi.fn();

    render(
      <Blog blog={blog} handleLike={mockHandleLike} handleDelete={() => {}} />
    );

    // Hacer visible el botón Like
    const viewButton = screen.getByText("View");
    fireEvent.click(viewButton); // Se debe hacer clic para que aparezca el botón de Like

    // Seleccionar el botón "Like"
    const likeButton = screen.getByText("Like");

    // Simular dos clics en "Like"
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    // Verificar que handleLike se llamó exactamente dos veces
    expect(mockHandleLike).toHaveBeenCalledTimes(2);
  });
});

describe("BlogForm component", () => {
  it("llama a createBlog con los detalles correctos al enviar el formulario", () => {
    // Mock de la función createBlog
    const mockCreateBlog = vi.fn();

    // Renderizar el formulario
    render(<BlogForm createBlog={mockCreateBlog} />);

    // Seleccionar los campos de entrada
    const titleInput = screen.getByPlaceholderText("write title here");
    const authorInput = screen.getByPlaceholderText("write author here");
    const urlInput = screen.getByPlaceholderText("write url here");
    const submitButton = screen.getByText("save");

    // Simular entrada de datos
    fireEvent.change(titleInput, { target: { value: "Nuevo Blog" } });
    fireEvent.change(authorInput, { target: { value: "Autor Prueba" } });
    fireEvent.change(urlInput, { target: { value: "https://nuevoblog.com" } });

    // Simular envío del formulario
    fireEvent.click(submitButton);

    // Verificar que createBlog se llamó una vez con los datos correctos
    expect(mockCreateBlog).toHaveBeenCalledTimes(1);
    expect(mockCreateBlog).toHaveBeenCalledWith({
      title: "Nuevo Blog",
      author: "Autor Prueba",
      url: "https://nuevoblog.com",
      likes: 0,
    });
  });
});
