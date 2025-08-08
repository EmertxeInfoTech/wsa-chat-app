import React, { useRef, useState } from "react";
import styles from "../Styles/MessageInput.module.css";
import { Image, X, Send } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

export default function MessageInput() {
  const [text, setText] = useState();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();
  const { getToken } = useAuth();
  // const dummyImagePreview = "https://i.pravatar.cc/150?img=67";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;

    const token = await getToken();
    if (!token) return;
    const formData = new FormData();

    if (text) formData.append("text", text);
    if (image) formData.append("image", image);

    await sendMessage(formData, token);
    setText("");
    removeImage();
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSendMessage}>
      {/* Show Dummy Image preview */}
      {imagePreview && (
        <div className={styles.previewContainer}>
          <img
            src={imagePreview}
            alt="Preview"
            className={styles.previewImage}
          />
          <button
            type="button"
            className={styles.removeButton}
            onClick={removeImage}
          >
            <X size={20} />
          </button>
        </div>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.imageButtons}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={20} />
        </button>
        {/* hidden file input, not functional in static version */}
        <input
          type="file"
          hidden
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message.."
          className={styles.textInput}
        />
        {/* Send button is enabled since we have dummy content */}
        <button type="submit" className={styles.sendButton}>
          <Send size={20} />
        </button>
      </div>
    </form>
  );
}
