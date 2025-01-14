import {View, Text} from "react-native"
import { s } from './styles'
import { Step } from "../step"
import { IconQrcode } from "@tabler/icons-react-native"
import { IconMapPin } from "@tabler/icons-react-native"
import { IconTicket } from "@tabler/icons-react-native"


export function Steps(){
    return(
        <View style={s.container}>
            <Text style={s.title}>Veja como funciona:</Text>
            <Step title="Encontro estabelecimentos" description="Veja locais perto de você que são parceiros Nearby" icon={IconQrcode}></Step>
            <Step title="Ative cupom com QR Code" description="Escaneie o código no estabelcimento para usar o benefício" icon={IconMapPin}></Step>
            <Step title="Garanta vantagens perto de você" description="Ative cupons onde estiver, em diferentes tipos de estabelecimento" icon={IconTicket}></Step>
        </View>
    )
}