'use client';

import { useRouter,useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from 'query-string'

interface CategoryBoxProps {
  icon: IconType,
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback( ( ) => {
    let currentQuery = {}

    //Se existir parametros, iremos transformar em string para depois transformar em objeto
    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    //utilizando o spread para descontruir o objeto e capturar a categoria
    const updateQuery: any = {
      ...currentQuery,
      category: label
    }

    //Se a categoria ja estiver sido selecionada e a gente clicar novamente, irá remover a categoria
    if (params?.get('category') === label ) {
      delete updateQuery.category
    }

    //gerando uma nova url passando a query acima
    const url = qs.stringifyUrl ({
      url: '/',
      query: updateQuery
    }, { skipNull: true})

    router.push(url)
  }, [label, params, router])

  return (
    
    <div
    onClick={handleClick} 
    className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${ selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${ selected ? 'text-neutral-800' : 'text-neutral-500'}
        `}>
        <Icon size={26} />
        <div className="font-medium text-sm">
            {label}
        </div>
    </div>
  )
}
 
export default CategoryBox;