import Container from "../Container"
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: 'Praia',
    icon: TbBeach,
    description: 'Está propriedade é perto da praia!',
  },
  {
    label: 'Moinhos',
    icon: GiWindmill,
    description: 'Está propriedade possui moinho de vento!',
  },
  {
    label: 'Moderna',
    icon: MdOutlineVilla,
    description: 'Está propriedade é moderna!'
  },
  {
    label: 'Interior',
    icon: TbMountain,
    description: 'Está propriedade é no interior!'
  },
  {
    label: 'Piscina',
    icon: TbPool,
    description: 'Está propriedade possui piscina!'
  },
  {
    label: 'Ilhas',
    icon: GiIsland,
    description: 'Está propriedade está em uma ilha!'
  },
  {
    label: 'Lago',
    icon: GiBoatFishing,
    description: 'Está propriedade está perto de um lago'
  },
  {
    label: 'Esqui',
    icon: FaSkiing,
    description: 'Está propriedade possui atividades de esqui!'
  },
  {
    label: 'Castelo',
    icon: GiCastle,
    description: 'Está propriedade é um castelo antigo!'
  },
  {
    label: 'Caverna',
    icon: GiCaveEntrance,
    description: 'Está propriedade é uma caverna assustadora!'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'Está propriedade oferece atividades de camping!'
  },
  {
    label: 'Artico',
    icon: BsSnow,
    description: 'Está propriedade está em um ambiente ártico!'
  },
  {
    label: 'Deserto',
    icon: GiCactus,
    description: 'Está propriedade está em um deserto!'
  },
  {
    label: 'Celeiro',
    icon: GiBarn,
    description: 'Está propriedade está em um celeiro!'
  },
  {
    label: 'Luxo',
    icon: IoDiamond,
    description: 'Está propriedade é nova e luxuosa!'
  }
]

const Categories = ( ) => {

    const params = useSearchParams()
    const category = params?.get('category') //Capturando a categoria da url
    const pathname = usePathname()

    const isMainPage = pathname === '/'

    if (!isMainPage) return null


    return (
        <Container>
            <div className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto"
            >
                {categories.map ((item) => (
                  <CategoryBox
                    key={item.label}
                    label={item.label}
                    selected= { category === item.label}
                    icon={item.icon} 
                    />
                ))}
            </div>
        </Container>
    )
}

export default Categories