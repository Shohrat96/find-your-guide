import { TouchableOpacity, ActivityIndicator, Text } from "react-native";


export default function Button({
  variant = "default",
  size = "default",
  title,
  onPress,
  icon,
  isLoading,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor:
          variant === "default"
            ? "#000"
            : variant === "destructive"
              ? "crimson"
              : variant === "secondary"
                ? "#d3d3d3"
                : variant === "outline" || variant === "ghost"
                  ? "transparent"
                  : "",
        height: size === "default" ? 40 : size === "sm" ? 36 : 44,
        paddingHorizontal: size === "default" ? 16 : size === "sm" ? 12 : 32,
        paddingVertical: size === "default" ? 8 : 0,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        borderWidth: variant === "outline" ? 1 : 0,
        borderColor: variant === "outline" ? "#d3d3d3" : "",
        flexDirection: icon ? "row" : undefined,
        gap: icon ? 12 : 0,
        width: "100%",
      }}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          <Text
            style={{
              color:
                variant === "default" || variant === "destructive"
                  ? "#fff"
                  : "#000",
              fontSize: 16,
            }}
          >
            {title}
          </Text>
          {icon && icon}
        </>
      )}
    </TouchableOpacity>
  );
}
