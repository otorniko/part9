import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import styled from "@mui/material/styles/styled";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#1976d2',
        color: '#fff',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

export default HtmlTooltip;