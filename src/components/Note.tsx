import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import "./Note.css";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import ReactMarkdown from "react-markdown";
import IconButton from "@mui/material/IconButton";
import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export interface NoteProps {
  id: string;
  text: string;
  imageUrl?: string; // Add support for image URLs
  position: { x: number; y: number };
  zIndex: number;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, imageUrl?: string) => void; // Update onEdit to handle images
  onPositionChange: (id: string, pos: { x: number; y: number }) => void;
  bringToFront: (id: string) => void;
  onContextMenu?: (e: React.MouseEvent) => void;
}

const Note: React.FC<NoteProps> = ({
  id,
  text,
  imageUrl,
  position,
  zIndex,
  bringToFront,
  onDelete,
  onEdit,
  onPositionChange,
  onContextMenu,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [noteImage, setNoteImage] = useState(imageUrl || "");
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageDialogType, setImageDialogType] = useState<"upload" | "link">("upload");
  const [tempImageUrl, setTempImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({
    width: 200,
    height: 200,
  });

  useEffect(() => {
    setEditText(text);
  }, [text]);

  useEffect(() => {
    setNoteImage(imageUrl || "");
  }, [imageUrl]);

  const handleDragStop = (_e: any, data: { x: number; y: number }) => {
    onPositionChange(id, { x: data.x, y: data.y });
  };

  const onResize = (
    event: React.SyntheticEvent,
    { size }: { size: { width: number; height: number } }
  ) => {
    setSize({ width: size.width, height: size.height });
  };

  const handleTextEdit = () => {
    setIsEditing(false);
    onEdit(id, editText, noteImage);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setNoteImage(imageUrl);
        onEdit(id, editText, imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageLinkSave = () => {
    setNoteImage(tempImageUrl);
    onEdit(id, editText, tempImageUrl);
    setShowImageDialog(false);
  };

  const handleRemoveImage = () => {
    setNoteImage("");
    onEdit(id, editText, "");
  };

  const openImageDialog = (type: "upload" | "link") => {
    setImageDialogType(type);
    setTempImageUrl("");
    setShowImageDialog(true);
    if (type === "upload" && fileInputRef.current) {
      setTimeout(() => fileInputRef.current?.click(), 100);
    }
  };

  return (
    <div
      className="note-wrapper"
      style={{ position: "absolute", zIndex: zIndex }}
      onClick={() => {
        bringToFront(id);
      }}
    >
      <Draggable
        nodeRef={nodeRef}
        handle=".handle"
        scale={1}
        position={position}
        onStart={() => {
          bringToFront(id);
        }}
        onStop={handleDragStop}
        offsetParent={document.body}
      >
        <div
          className="note-container"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            zIndex: zIndex,
          }}
          onContextMenu={onContextMenu}
        >
          <Resizable
            width={size.width}
            height={size.height}
            onResize={onResize}
            minConstraints={[100, 100]}
            maxConstraints={[800, 800]}
            resizeHandles={["se"]}
          >
            <div
              ref={nodeRef}
              className="note"
              style={{
                width: size.width + "px",
                height: size.height + "px",
                position: "absolute",
              }}
            >
              <div className="controls">
                <div className="handle"></div>
                <div className="image-controls">
                  <IconButton
                    size="small"
                    onClick={() => openImageDialog("upload")}
                    title="Upload image"
                  >
                    <ImageIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => openImageDialog("link")}
                    title="Link image"
                  >
                    <LinkIcon fontSize="small" />
                  </IconButton>
                  {noteImage && (
                    <IconButton
                      size="small"
                      onClick={handleRemoveImage}
                      title="Remove image"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                  <IconButton
                    className="mui-delete-button"
                    onClick={() => onDelete(id)}
                    color="error"
                    size="small"
                    aria-label="delete note"
                    title="Delete note"
                  >
                    <CloseIcon />
                  </IconButton>
                </div>

              </div>

              <div className="note-content">
                {noteImage && (
                  <div className="note-image-container">
                    <img
                      src={noteImage}
                      alt="Note"
                      className="note-image"
                    />
                  </div>
                )}

                {isEditing ? (
                  <textarea
                    className="note-text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={handleTextEdit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleTextEdit();
                      }
                    }}
                    autoFocus
                    style={{ width: "100%", height: noteImage ? "calc(100% - 120px)" : "100%", resize: "none" }}
                  />
                ) : (
                  <p className="note-text" onClick={() => setIsEditing(true)}>
                    <ReactMarkdown>{text || "Click to edit"}</ReactMarkdown>
                  </p>
                )}
              </div>

              <p className="coordinates">
                {Math.round(position.x)},{Math.round(position.y)} | {size.width}
                x{size.height}
              </p>

              {/* Hidden file input for image upload */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </Resizable>
        </div>
      </Draggable>

      {/* Image URL Dialog */}
      <Dialog open={showImageDialog && imageDialogType === "link"} onClose={() => setShowImageDialog(false)}>
        <DialogTitle>Add Image URL</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="imageUrl"
            label="Image URL"
            type="url"
            fullWidth
            variant="outlined"
            value={tempImageUrl}
            onChange={(e) => setTempImageUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowImageDialog(false)}>Cancel</Button>
          <Button onClick={handleImageLinkSave}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Note;
