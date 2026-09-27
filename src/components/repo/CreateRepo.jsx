import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { Button } from "@primer/react";

const CreateRepo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateRepo = async (e) => {
    e.preventDefault();

    const owner = localStorage.getItem("userId");

    if (!owner) {
      alert("User not logged in");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/repo/create", {
        name,
        description,
        owner,
        content: "",
        visibility: true,
        issues: [],
      });

      console.log(response.data);

      alert("Repository created successfully");

      navigate("/"); 
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.error ||
        "Repository creation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box-wrapper">
        <form
          className="login-box"
          onSubmit={handleCreateRepo}
        >
          <div>
            <label
              className="label"
              htmlFor="name"
            >
              Repository Name
            </label>

            <input
              name="name"
              id="name"
              className="input"
              type="text"
              required
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div>
            <label
              className="label"
              htmlFor="description"
            >
              Description
            </label>

            <input
              name="description"
              id="description"
              className="input"
              type="text"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </div>

          <Button
            variant="primary"
            className="create-repo"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Repository"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateRepo;