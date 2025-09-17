import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResponseDto } from './dto/post-response.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async getPostById(@Param('id') id: number): Promise<ResponseDto<PostResponseDto>> {
    return {
        data: await this.postService.getPostById(+id),
        message: 'Post found successfully',
        success: true
    };
  }

  @Get('user/:userId')
  async getAllPostsByUserId(@Param('userId') userId: number): Promise<ResponseDto<PostResponseDto[]>> {
    return {
        data: await this.postService.getAllPostsByUserId(+userId),
        message: 'Posts found successfully',
        success: true
    };
  }

  @Post()
  async createPost(@Body() data: CreatePostDto, @Req() req: Request): Promise<ResponseDto<PostResponseDto>> {
    const userId = 1; // TODO: get user id from token
    return {
        data: await this.postService.createPost(data, userId),
        message: 'Post created successfully',
        success: true
    };
  }

  @Get('near/:locationId')
  async getAllPostsNear(@Param('locationId') locationId: number): Promise<ResponseDto<PostResponseDto[]>> {
    return {
        data: await this.postService.getAllPostsNear(+locationId),
        message: 'Posts found successfully',
        success: true
    };
  }

  @Get('location/:locationId')
  async getPostsByLocationId(@Param('locationId') locationId: number): Promise<ResponseDto<PostResponseDto[]>> {
    return {
        data: await this.postService.getPostsByLocationId(+locationId),
        message: 'Posts found successfully',
        success: true
    };
  }

  @Get('count/:userId')
  async getPostCount(@Param('userId') userId: number): Promise<ResponseDto<number>> {
    return {
        data: await this.postService.getPostCount(+userId),
        message: 'Post count found successfully',
        success: true
    };
  }

  @Get('active/:userId')
  async getActivePostsByUserId(@Param('userId') userId: number): Promise<ResponseDto<PostResponseDto[]>> {
    return {
        data: await this.postService.getActivePostsByUserId(+userId),
        message: 'Active posts found successfully',
        success: true
    };
  }

  @Patch('incourse/:postId')
  async markPostAsIncourse(@Param('postId') postId: number): Promise<void> {
    await this.postService.markPostAsIncourse(+postId);
  }

  @Patch('finished/:postId')
  async markPostAsFinished(@Param('postId') postId: number): Promise<void> {
    await this.postService.markPostAsFinished(+postId);
  }
}
