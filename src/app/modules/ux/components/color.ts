export enum ColorShade {
    none = 0,
    lighten = 1,
    darken = 2,
    accent = 4
}


export class Color {
    groupNumber:number;
    colorCode:string;
    color:string;
    colorShade: ColorShade;
    colorShadeNum:number;
    colorText:string;
    isDefault:boolean;

    static GetPrimaryColors():Color[] {
        return [
            { groupNumber: 1, colorCode:'#ffffff', color:'white', colorShade:ColorShade.none, isDefault: true } as Color,
            { groupNumber: 1, colorCode:'#f44336', color:'red', colorShade:ColorShade.none, isDefault: true } as Color,
            { groupNumber: 1, colorCode:'#2196f3', color:'blue', colorShade:ColorShade.none, isDefault: true } as Color,
            { groupNumber: 1, colorCode:'#4caf50', color:'green', colorShade:ColorShade.none, isDefault: true } as Color,
            { groupNumber: 1, colorCode:'#ffeb3b', color:'yellow', colorShade:ColorShade.none, isDefault: true } as Color,
            { groupNumber: 1, colorCode:'#000000', color:'black', colorShade:ColorShade.none, isDefault: true } as Color,
        ];
    }

    static GetAllColors():Color[] {
        return [
            { groupNumber: 1, colorCode:'#ffebee', color:'red', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,
            { groupNumber: 2, colorCode:'#fce4ec', color:'pink', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,
            { groupNumber: 3, colorCode:'#f3e5f5', color:'purple', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,
            { groupNumber: 4, colorCode:'#ede7f6', color:'deep-purple', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,
            { groupNumber: 5, colorCode:'#e8eaf6', color:'indigo', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,
            { groupNumber: 6, colorCode:'#e3f2fd', color:'blue', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,

            { groupNumber: 1, colorCode:'#ffcdd2', color:'red', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 2, colorCode:'#f8bbd0', color:'pink', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 3, colorCode:'#e1bee7', color:'purple', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 4, colorCode:'#d1c4e9', color:'deep-purple', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 5, colorCode:'#c5cae9', color:'indigo', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 6, colorCode:'#bbdefb', color:'blue', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,

            { groupNumber: 1, colorCode:'#ef9a9a', color:'red', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 2, colorCode:'#f48fb1', color:'pink', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 3, colorCode:'#ce93d8', color:'purple', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 4, colorCode:'#b39ddb', color:'deep-purple', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 5, colorCode:'#9fa8da', color:'indigo', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 6, colorCode:'#90caf9', color:'blue', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,

            { groupNumber: 1, colorCode:'#e57373', color:'red', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 2, colorCode:'#f06292', color:'pink', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 3, colorCode:'#ba68c8', color:'purple', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 4, colorCode:'#9575cd', color:'deep-purple', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 5, colorCode:'#7986cb', color:'indigo', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 6, colorCode:'#64b5f6', color:'blue', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,

            { groupNumber: 1, colorCode:'#ef5350', color:'red', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 2, colorCode:'#ec407a', color:'pink', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 3, colorCode:'#ab47bc', color:'purple', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 4, colorCode:'#7e57c2', color:'deep-purple', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 5, colorCode:'#5c6bc0', color:'indigo', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 6, colorCode:'#42a5f5', color:'blue', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,

            { groupNumber: 1, colorCode:'#f44336', color:'red', colorShade:ColorShade.none } as Color,
            { groupNumber: 2, colorCode:'#e91e63', color:'pink', colorShade:ColorShade.none } as Color,
            { groupNumber: 3, colorCode:'#9c27b0', color:'purple', colorShade:ColorShade.none } as Color,
            { groupNumber: 4, colorCode:'#673ab7', color:'deep-purple', colorShade:ColorShade.none } as Color,
            { groupNumber: 5, colorCode:'#3f51b5', color:'indigo', colorShade:ColorShade.none } as Color,
            { groupNumber: 6, colorCode:'#2196f3', color:'blue', colorShade:ColorShade.none } as Color,

            { groupNumber: 1, colorCode:'#e53935', color:'red', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,
            { groupNumber: 2, colorCode:'#d81b60', color:'pink', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,
            { groupNumber: 3, colorCode:'#8e24aa', color:'purple', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,
            { groupNumber: 4, colorCode:'#5e35b1', color:'deep-purple', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,
            { groupNumber: 5, colorCode:'#3949ab', color:'indigo', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,
            { groupNumber: 6, colorCode:'#1e88e5', color:'blue', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,

            { groupNumber: 1, colorCode:'#d32f2f', color:'red', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,
            { groupNumber: 2, colorCode:'#c2185b', color:'pink', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,
            { groupNumber: 3, colorCode:'#7b1fa2', color:'purple', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,
            { groupNumber: 4, colorCode:'#512da8', color:'deep-purple', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,
            { groupNumber: 5, colorCode:'#303f9f', color:'indigo', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,
            { groupNumber: 6, colorCode:'#1976d2', color:'blue', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,

            { groupNumber: 1, colorCode:'#c62828', color:'red', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,
            { groupNumber: 2, colorCode:'#ad1457', color:'pink', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,
            { groupNumber: 3, colorCode:'#6a1b9a', color:'purple', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,
            { groupNumber: 4, colorCode:'#4527a0', color:'deep-purple', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,
            { groupNumber: 5, colorCode:'#283593', color:'indigo', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,
            { groupNumber: 6, colorCode:'#1565c0', color:'blue', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,

            { groupNumber: 1, colorCode:'#b71c1c', color:'red', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,
            { groupNumber: 2, colorCode:'#880e4f', color:'pink', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,
            { groupNumber: 3, colorCode:'#4a148c', color:'purple', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,
            { groupNumber: 4, colorCode:'#311b92', color:'deep-purple', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,
            { groupNumber: 5, colorCode:'#1a237e', color:'indigo', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,
            { groupNumber: 6, colorCode:'#0d47a1', color:'blue', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,


            { groupNumber: 7, colorCode:'#e1f5fe', color:'light-blue', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,
            { groupNumber: 8, colorCode:'#e0f7fa', color:'cyan', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,
            { groupNumber: 9, colorCode:'#e0f2f1', color:'teal', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,
            { groupNumber: 10, colorCode:'#e8f5e9', color:'green', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,
            { groupNumber: 11, colorCode:'#f1f8e9', color:'light-green', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,
            { groupNumber: 12, colorCode:'#f9fbe7', color:'lime', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,

            { groupNumber: 7, colorCode:'#b3e5fc', color:'light-blue', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 8, colorCode:'#b2ebf2', color:'cyan', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 9, colorCode:'#b2dfdb', color:'teal', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 10, colorCode:'#c8e6c9', color:'green', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 11, colorCode:'#dcedc8', color:'light-green', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 12, colorCode:'#f0f4c3', color:'lime', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,

            { groupNumber: 7, colorCode:'#81d4fa', color:'light-blue', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 8, colorCode:'#80deea', color:'cyan', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 9, colorCode:'#80cbc4', color:'teal', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 10, colorCode:'#a5d6a7', color:'green', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 11, colorCode:'#c5e1a5', color:'light-green', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 12, colorCode:'#e6ee9c', color:'lime', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,

            { groupNumber: 7, colorCode:'#4fc3f7', color:'light-blue', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 8, colorCode:'#4dd0e1', color:'cyan', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 9, colorCode:'#4db6ac', color:'teal', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 10, colorCode:'#81c784', color:'green', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 11, colorCode:'#aed581', color:'light-green', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 12, colorCode:'#dce775', color:'lime', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,

            { groupNumber: 7, colorCode:'#29b6f6', color:'light-blue', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 8, colorCode:'#26c6da', color:'cyan', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 9, colorCode:'#26a69a', color:'teal', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 10, colorCode:'#66bb6a', color:'green', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 11, colorCode:'#9ccc65', color:'light-green', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 12, colorCode:'#d4e157', color:'lime', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,

            { groupNumber: 7, colorCode:'#03a9f4', color:'light-blue', colorShade:ColorShade.none } as Color,
            { groupNumber: 8, colorCode:'#00bcd4', color:'cyan', colorShade:ColorShade.none } as Color,
            { groupNumber: 9, colorCode:'#009688', color:'teal', colorShade:ColorShade.none } as Color,
            { groupNumber: 10, colorCode:'#4caf50', color:'green', colorShade:ColorShade.none } as Color,
            { groupNumber: 11, colorCode:'#8bc34a', color:'light-green', colorShade:ColorShade.none } as Color,
            { groupNumber: 12, colorCode:'#cddc39', color:'lime', colorShade:ColorShade.none } as Color,

            { groupNumber: 7, colorCode:'#039be5', color:'light-blue', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,
            { groupNumber: 8, colorCode:'#00acc1', color:'cyan', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,
            { groupNumber: 9, colorCode:'#00897b', color:'teal', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,
            { groupNumber: 10, colorCode:'#43a047', color:'green', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,
            { groupNumber: 11, colorCode:'#7cb342', color:'light-green', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,
            { groupNumber: 12, colorCode:'#c0ca33', color:'lime', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,

            { groupNumber: 7, colorCode:'#0288d1', color:'light-blue', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,
            { groupNumber: 8, colorCode:'#0097a7', color:'cyan', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,
            { groupNumber: 9, colorCode:'#00796b', color:'teal', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,
            { groupNumber: 10, colorCode:'#388e3c', color:'green', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,
            { groupNumber: 11, colorCode:'#689f38', color:'light-green', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,
            { groupNumber: 12, colorCode:'#afb42b', color:'lime', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,

            { groupNumber: 7, colorCode:'#0277bd', color:'light-blue', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,
            { groupNumber: 8, colorCode:'#00838f', color:'cyan', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,
            { groupNumber: 9, colorCode:'#00695c', color:'teal', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,
            { groupNumber: 10, colorCode:'#2e7d32', color:'green', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,
            { groupNumber: 11, colorCode:'#558b2f', color:'light-green', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,
            { groupNumber: 12, colorCode:'#9e9d24', color:'lime', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,

            { groupNumber: 7, colorCode:'#0091ea', color:'light-blue', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,
            { groupNumber: 8, colorCode:'#00b8d4', color:'cyan', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,
            { groupNumber: 9, colorCode:'#004d40', color:'teal', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,
            { groupNumber: 10, colorCode:'#1b5e20', color:'green', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,
            { groupNumber: 11, colorCode:'#33691e', color:'light-green', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,
            { groupNumber: 12, colorCode:'#827717', color:'lime', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,

            
            { groupNumber: 13, colorCode:'#fffde7', color:'yellow', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,
            { groupNumber: 14, colorCode:'#fff8e1', color:'amber', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,
            { groupNumber: 15, colorCode:'#fff3e0', color:'orange', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,
            { groupNumber: 16, colorCode:'#fbe9e7', color:'deep-orange', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,
            { groupNumber: 17, colorCode:'#efebe9', color:'brown', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,
            { groupNumber: 18, colorCode:'#fafafa', color:'grey', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,

            { groupNumber: 13, colorCode:'#fff9c4', color:'yellow', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 14, colorCode:'#ffecb3', color:'amber', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 15, colorCode:'#ffe0b2', color:'orange', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 16, colorCode:'#ffccbc', color:'deep-orange', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 17, colorCode:'#d7ccc8', color:'brown', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 18, colorCode:'#f5f5f5', color:'grey', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,

            { groupNumber: 13, colorCode:'#fff59d', color:'yellow', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 14, colorCode:'#ffe082', color:'amber', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 15, colorCode:'#ffcc80', color:'orange', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 16, colorCode:'#ffab91', color:'deep-orange', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 17, colorCode:'#bcaaa4', color:'brown', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 18, colorCode:'#eeeeee', color:'grey', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,

            { groupNumber: 13, colorCode:'#fff176', color:'yellow', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 14, colorCode:'#ffd54f', color:'amber', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 15, colorCode:'#ffb74d', color:'orange', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 16, colorCode:'#ff8a65', color:'deep-orange', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 17, colorCode:'#a1887f', color:'brown', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 18, colorCode:'#e0e0e0', color:'grey', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,

            { groupNumber: 13, colorCode:'#ffee58', color:'yellow', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 14, colorCode:'#ffca28', color:'amber', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 15, colorCode:'#ffa726', color:'orange', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 16, colorCode:'#ff7043', color:'deep-orange', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 17, colorCode:'#8d6e63', color:'brown', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 18, colorCode:'#bdbdbd', color:'grey', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,

            { groupNumber: 13, colorCode:'#ffeb3b', color:'yellow', colorShade:ColorShade.none } as Color,
            { groupNumber: 14, colorCode:'#ffc107', color:'amber', colorShade:ColorShade.none } as Color,
            { groupNumber: 15, colorCode:'#ff9800', color:'orange', colorShade:ColorShade.none } as Color,
            { groupNumber: 16, colorCode:'#ff5722', color:'deep-orange', colorShade:ColorShade.none } as Color,
            { groupNumber: 17, colorCode:'#795548', color:'brown', colorShade:ColorShade.none } as Color,
            { groupNumber: 18, colorCode:'#9e9e9e', color:'grey', colorShade:ColorShade.none } as Color,

            { groupNumber: 13, colorCode:'#fdd835', color:'yellow', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,
            { groupNumber: 14, colorCode:'#ffb300', color:'amber', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,
            { groupNumber: 15, colorCode:'#fb8c00', color:'orange', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,
            { groupNumber: 16, colorCode:'#f4511e', color:'deep-orange', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,
            { groupNumber: 17, colorCode:'#6d4c41', color:'brown', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,
            { groupNumber: 18, colorCode:'#757575', color:'grey', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,

            { groupNumber: 13, colorCode:'#fbc02d', color:'yellow', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,
            { groupNumber: 14, colorCode:'#ffa000', color:'amber', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,
            { groupNumber: 15, colorCode:'#f57c00', color:'orange', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,
            { groupNumber: 16, colorCode:'#e64a19', color:'deep-orange', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,
            { groupNumber: 17, colorCode:'#5d4037', color:'brown', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,
            { groupNumber: 18, colorCode:'#616161', color:'grey', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,

            { groupNumber: 13, colorCode:'#f9a825', color:'yellow', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,
            { groupNumber: 14, colorCode:'#ff8f00', color:'amber', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,
            { groupNumber: 15, colorCode:'#ef6c00', color:'orange', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,
            { groupNumber: 16, colorCode:'#d84315', color:'deep-orange', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,
            { groupNumber: 17, colorCode:'#4e342e', color:'brown', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,
            { groupNumber: 18, colorCode:'#424242', color:'grey', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,

            { groupNumber: 13, colorCode:'#f57f17', color:'yellow', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,
            { groupNumber: 14, colorCode:'#ff6f00', color:'amber', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,
            { groupNumber: 15, colorCode:'#e65100', color:'orange', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,
            { groupNumber: 16, colorCode:'#bf360c', color:'deep-orange', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,
            { groupNumber: 17, colorCode:'#3e2723', color:'brown', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,
            { groupNumber: 18, colorCode:'#212121', color:'grey', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,


            { groupNumber: 19, colorCode:'#eceff1', color:'blue-grey', colorShade:ColorShade.lighten, colorShadeNum:5 } as Color,
            { groupNumber: 20, colorCode:'#ff8a80', color:'red', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 21, colorCode:'#ff5252', color:'red', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 22, colorCode:'#ff1744', color:'red', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 23, colorCode:'#d50000', color:'red', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 24, colorCode:'#ff3d00', color:'deep-orange', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:3 } as Color,

            { groupNumber: 19, colorCode:'#cfd8dc', color:'blue-grey', colorShade:ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 20, colorCode:'#ff80ab', color:'pink', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 21, colorCode:'#ff4081', color:'pink', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 22, colorCode:'#f50057', color:'pink', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 23, colorCode:'#c51162', color:'pink', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 24, colorCode:'#ff9100', color:'orange', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:3 } as Color,

            { groupNumber: 19, colorCode:'#b0bec5', color:'blue-grey', colorShade:ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 20, colorCode:'#ea80fc', color:'purple', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 21, colorCode:'#e040fb', color:'purple', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 22, colorCode:'#d500f9', color:'purple', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 23, colorCode:'#aa00ff', color:'purple', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 24, colorCode:'#ffc400', color:'amber', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:3 } as Color,

            { groupNumber: 19, colorCode:'#90a4ae', color:'blue-grey', colorShade:ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 20, colorCode:'#b388ff', color:'deep-purple', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 21, colorCode:'#7c4dff', color:'deep-purple', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 22, colorCode:'#651fff', color:'deep-purple', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 23, colorCode:'#6200ea', color:'deep-purple', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 24, colorCode:'#ffea00', color:'yellow', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:3 } as Color,

            { groupNumber: 19, colorCode:'#78909c', color:'blue-grey', colorShade:ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 20, colorCode:'#8c9eff', color:'indigo', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 21, colorCode:'#536dfe', color:'indigo', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 22, colorCode:'#3d5afe', color:'indigo', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 23, colorCode:'#304ffe', color:'indigo', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 24, colorCode:'#aeea00', color:'lime', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:4 } as Color,

            { groupNumber: 19, colorCode:'#607d8b', color:'blue-grey', colorShade:ColorShade.none } as Color,
            { groupNumber: 20, colorCode:'#82b1ff', color:'blue', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 21, colorCode:'#448aff', color:'blue', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 22, colorCode:'#2979ff', color:'blue', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 23, colorCode:'#2962ff', color:'blue', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 24, colorCode:'#aeea00', color:'lime', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:4 } as Color,

            { groupNumber: 19, colorCode:'#546e7a', color:'blue-grey', colorShade:ColorShade.darken, colorShadeNum:1 } as Color,
            { groupNumber: 20, colorCode:'#80d8ff', color:'light-blue', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 21, colorCode:'#40c4ff', color:'light-blue', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 22, colorCode:'#00b0ff', color:'light-blue', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 23, colorCode:'#0091ea', color:'light-blue', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 24, colorCode:'#ffd600', color:'yellow', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:4 } as Color,

            { groupNumber: 19, colorCode:'#455a64', color:'blue-grey', colorShade:ColorShade.darken, colorShadeNum:2 } as Color,
            { groupNumber: 20, colorCode:'#84ffff', color:'cyan', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 21, colorCode:'#18ffff', color:'cyan', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 22, colorCode:'#00e5ff', color:'cyan', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 23, colorCode:'#00b8d4', color:'cyan', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 24, colorCode:'#ffab00', color:'amber', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:4 } as Color,

            { groupNumber: 19, colorCode:'#37474f', color:'blue-grey', colorShade:ColorShade.darken, colorShadeNum:3 } as Color,
            { groupNumber: 20, colorCode:'#a7ffeb', color:'teal', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 21, colorCode:'#64ffda', color:'teal', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 22, colorCode:'#1de9b6', color:'teal', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 23, colorCode:'#00bfa5', color:'teal', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 24, colorCode:'#ff6d00', color:'orange', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:4 } as Color,

            { groupNumber: 19, colorCode:'#263238', color:'blue-grey', colorShade:ColorShade.darken, colorShadeNum:4 } as Color,
            { groupNumber: 20, colorCode:'#b9f6ca', color:'green', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:1 } as Color,
            { groupNumber: 21, colorCode:'#69f0ae', color:'green', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:2 } as Color,
            { groupNumber: 22, colorCode:'#00e676', color:'green', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:3 } as Color,
            { groupNumber: 23, colorCode:'#00c853', color:'green', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:4 } as Color,
            { groupNumber: 24, colorCode:'#dd2c00', color:'deep-orange', colorShade:ColorShade.accent | ColorShade.lighten, colorShadeNum:4 } as Color,
        ];
    }
}