import { Text, Pressable, PressableProps } from "react-native"
import { categoriesIcons } from "@/utils/categories-icons"
import { colors } from "@/styles/theme"
import { s } from "./style"

type Props = PressableProps & {
    iconId: string
    isSelected?: boolean
    name: string
}

export function Category({ name, iconId, isSelected, ...rest}: Props){
    const Icon = categoriesIcons[iconId]  
    return (
        <Pressable style={[s.container, isSelected && s.containerSelected ]} {...rest}>
            <Icon size={16} color={colors.gray[isSelected ? 100 : 400]}/>
            <Text style={[s.name, isSelected && s.nameSelected]}>{name}</Text>
        </Pressable>
    );
}