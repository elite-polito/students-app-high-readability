export const getFontStyles = (fontIndex: number) => {
  switch (fontIndex) {
    case 0:
      return {
        fontFamily: 'Lexie',
      };
    case 1:
      return {
        fontFamily: 'Sylexiad',
      };
    case 2:
      return {
        fontFamily: 'OpenDyslexic',
      };
    case 3:
      return {
        fontFamily: 'Arial',
      };
    case 4:
      return {
        fontFamily: 'Century Gothic',
      };
    case 5:
      return {
      };
    default:
      return {};
}
}