import { Card, CardMedia } from "@mui/material";

interface IImageCardProps {
  imgSrc: string;
  imgStyles?: React.CSSProperties;
}

function ImageCard({ imgSrc, imgStyles = {} }: IImageCardProps) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        image={imgSrc}
        alt={`Results`}
        style={imgStyles}
      />
    </Card>
  );
}

export default ImageCard;
