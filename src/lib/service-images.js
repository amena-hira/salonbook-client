export const getServiceImage = (service) => {
    const name = service.serviceName.toLowerCase();
    const category = service.category.toLowerCase();

    if (name.includes("men")) return "/images/services/man-hair-cut.jpg";
    if (name.includes("women") || name.includes("blow")) return "/images/services/hair-cut.jpg";
    if (name.includes("bridal")) return "/images/services/hair.png";
    if (category.includes("color")) return "/images/services/hair-color.jpg";
    if (category.includes("facial") || category.includes("skin")) return "/images/services/facial.jpg";
    if (category.includes("makeup")) return "/images/services/eye-makeup.jpg";
    if (category.includes("nail") || category.includes("manicure")) {
        return "/images/services/nails-and-hair.jpg";
    }

    return "/images/services/brushing.jpg";
};
