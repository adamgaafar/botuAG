import { Controller, Get, UseGuards, Request } from "@nestjs/common";   
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "../auth/jwt.guard";

@Controller("profile")
export class ProfileController {
    @UseGuards(JwtAuthGuard)
    @Get()
    getProfile(@Request() req) {
        return {
            message: "You have access to your profile",
            user: req.user,
        };
    }
}