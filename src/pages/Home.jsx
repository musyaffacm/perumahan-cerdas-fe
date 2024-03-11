import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      <div className="w-full text-center text-gray-950 font-bold text-5xl">
        Perumahan Cerdas
      </div>
      <div className="flex gap-x-5">
        {MENU.map((item, index) => (
          <Card
            sx={{ maxWidth: 345 }}
            key={index}
            onClick={() => navigate(item.url)}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="40"
                image={item.image}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
};

const MENU = [
  {
    label: "Penghuni",
    image: "/images/cards/family.jpg",
    url: "/resident",
    desc: "Kelola data penghuni perumahan, tambah atau ubah informasi dengan mudah.",
  },
  {
    label: "Rumah",
    image: "/images/cards/house.jpg",
    url: "/house",
    desc: "Pantaui status rumah dan catatan historis penghuninya, perbaharui dengan cepat.",
  },
  {
    label: "Pembayaran",
    image: "/images/cards/payment.jpg",
    url: "/payment",
    desc: "Rekam pembayaran iuran bulanan, akses laporan ringkasan dan detail dengan cepat.",
  },
];

export default Home;
