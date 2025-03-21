import { Card, CardHeader, CardMedia } from "@mui/material";
import { FC } from "react";

type Props = {
  href: string;
  imgSrc: string;
  alt: string;
  text: string;
};

const PageCard: FC<Props> = (props) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={props.imgSrc}
        alt={props.alt}
      />
      <CardHeader title={props.text} />
    </Card>
  );
};

export default PageCard;
